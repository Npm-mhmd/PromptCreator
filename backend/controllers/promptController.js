import { validationResult } from 'express-validator';
import Prompt from '../models/Prompt.js';
import { generatePrompt } from '../services/agentRouterService.js';

export const createPrompt = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { originalIdea, goal, context, skill, level, promptType, outputLength, model } = req.body;

    const generatedPrompt = await generatePrompt({
      originalIdea,
      goal,
      context,
      skill,
      level,
      promptType,
      outputLength: outputLength || 'Medium',
    });

    const title = originalIdea.length > 60
      ? originalIdea.substring(0, 57) + '...'
      : originalIdea;

    const prompt = await Prompt.create({
      user: req.user._id,
      title,
      originalIdea,
      goal: goal || '',
      context: context || '',
      generatedPrompt,
      skill,
      level,
      promptType,
      outputLength: outputLength || 'Medium',
      model: model || '',
    });

    res.status(201).json(prompt);
  } catch (error) {
    next(error);
  }
};

export const getPrompts = async (req, res, next) => {
  try {
    const { search, skill, promptType, level, isFavorite, sort, page = 1, limit = 12 } = req.query;

    const query = { user: req.user._id };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { originalIdea: { $regex: search, $options: 'i' } },
        { generatedPrompt: { $regex: search, $options: 'i' } },
      ];
    }

    if (skill) query.skill = skill;
    if (promptType) query.promptType = promptType;
    if (level) query.level = level;
    if (isFavorite !== undefined) query.isFavorite = isFavorite === 'true';

    let sortOption = { createdAt: -1 };
    if (sort === 'oldest') sortOption = { createdAt: 1 };
    if (sort === 'favorites') sortOption = { isFavorite: -1, createdAt: -1 };
    if (sort === 'title') sortOption = { title: 1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Prompt.countDocuments(query);

    const prompts = await Prompt.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit))
      .lean();

    res.json({
      prompts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPromptById = async (req, res, next) => {
  try {
    const prompt = await Prompt.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    res.json(prompt);
  } catch (error) {
    next(error);
  }
};

export const updatePrompt = async (req, res, next) => {
  try {
    const { title, originalIdea, goal, context, skill, level, promptType, outputLength } = req.body;

    const prompt = await Prompt.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    if (title !== undefined) prompt.title = title;
    if (originalIdea !== undefined) prompt.originalIdea = originalIdea;
    if (goal !== undefined) prompt.goal = goal;
    if (context !== undefined) prompt.context = context;
    if (skill !== undefined) prompt.skill = skill;
    if (level !== undefined) prompt.level = level;
    if (promptType !== undefined) prompt.promptType = promptType;
    if (outputLength !== undefined) prompt.outputLength = outputLength;

    const updatedPrompt = await prompt.save();
    res.json(updatedPrompt);
  } catch (error) {
    next(error);
  }
};

export const deletePrompt = async (req, res, next) => {
  try {
    const prompt = await Prompt.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    await prompt.deleteOne();
    res.json({ message: 'Prompt deleted successfully' });
  } catch (error) {
    next(error);
  }
};

export const toggleFavorite = async (req, res, next) => {
  try {
    const prompt = await Prompt.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!prompt) {
      return res.status(404).json({ message: 'Prompt not found' });
    }

    prompt.isFavorite = !prompt.isFavorite;
    const updatedPrompt = await prompt.save();

    res.json(updatedPrompt);
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const [totalPrompts, favoritePrompts, recentPrompts, skillDistribution] = await Promise.all([
      Prompt.countDocuments({ user: userId }),
      Prompt.countDocuments({ user: userId, isFavorite: true }),
      Prompt.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select('title skill promptType createdAt')
        .lean(),
      Prompt.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$skill', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
    ]);

    res.json({
      totalPrompts,
      favoritePrompts,
      recentPrompts,
      skillDistribution,
    });
  } catch (error) {
    next(error);
  }
};
