import mongoose from 'mongoose';

const promptSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    originalIdea: {
      type: String,
      required: [true, 'Original idea is required'],
      trim: true,
      maxlength: [1000, 'Idea cannot exceed 1000 characters'],
    },
    goal: {
      type: String,
      trim: true,
      maxlength: [500, 'Goal cannot exceed 500 characters'],
      default: '',
    },
    context: {
      type: String,
      trim: true,
      maxlength: [1000, 'Context cannot exceed 1000 characters'],
      default: '',
    },
    generatedPrompt: {
      type: String,
      required: true,
    },
    skill: {
      type: String,
      enum: [
        'Software Engineering',
        'Business',
        'Marketing',
        'Design',
        'Data Science',
        'Cybersecurity',
        'Education',
        'Startup',
        'Content Creation',
        'Productivity',
      ],
      required: [true, 'Skill category is required'],
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      required: [true, 'Experience level is required'],
    },
    promptType: {
      type: String,
      enum: [
        'Coding',
        'Research',
        'Business Plan',
        'Marketing Strategy',
        'Learning',
        'Image Generation',
        'Automation',
        'General Purpose',
      ],
      required: [true, 'Prompt type is required'],
    },
    outputLength: {
      type: String,
      enum: ['Short', 'Medium', 'Long'],
      default: 'Medium',
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    model: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

promptSchema.index({ user: 1, createdAt: -1 });
promptSchema.index({ user: 1, isFavorite: -1 });
promptSchema.index({ user: 1, skill: 1 });

const Prompt = mongoose.model('Prompt', promptSchema);
export default Prompt;
