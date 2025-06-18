'use server';
/**
 * @fileOverview AI-powered task bundling flow.
 *
 * This file defines a Genkit flow that categorizes available tasks into personalized 'Task Bundles'
 * like 'Quick Wins' or 'Focused Effort' based on completion time and payout ratio.
 *
 * - smartTaskBundling - A function that handles the task bundling process.
 * - SmartTaskBundlingInput - The input type for the smartTaskBundling function.
 * - SmartTaskBundlingOutput - The return type for the smartTaskBundling function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TaskSchema = z.object({
  title: z.string().describe('The title of the task.'),
  description: z.string().describe('A brief description of the task.'),
  estimatedCompletionTime: z
    .number()
    .describe('The estimated completion time in minutes.'),
  payout: z.number().describe('The reward amount for completing the task.'),
});

const SmartTaskBundlingInputSchema = z.object({
  tasks: z.array(TaskSchema).describe('An array of available tasks.'),
});
export type SmartTaskBundlingInput = z.infer<typeof SmartTaskBundlingInputSchema>;

const TaskBundleSchema = z.object({
  bundleName: z.string().describe('The name of the task bundle (e.g., Quick Wins, Focused Effort).'),
  tasks: z.array(TaskSchema).describe('An array of tasks belonging to this bundle.'),
});

const SmartTaskBundlingOutputSchema = z.object({
  taskBundles: z.array(TaskBundleSchema).describe('An array of task bundles.'),
});
export type SmartTaskBundlingOutput = z.infer<typeof SmartTaskBundlingOutputSchema>;

export async function smartTaskBundling(input: SmartTaskBundlingInput): Promise<SmartTaskBundlingOutput> {
  return smartTaskBundlingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'smartTaskBundlingPrompt',
  input: {schema: SmartTaskBundlingInputSchema},
  output: {schema: SmartTaskBundlingOutputSchema},
  prompt: `You are an AI task bundling expert. You will receive a list of tasks with their title, description, estimated completion time, and payout.

  Your job is to categorize these tasks into personalized 'Task Bundles' based on completion time and payout ratio.
  Examples of task bundles are 'Quick Wins' (fast, low-reward tasks) or 'Focused Effort' (longer, higher-reward tasks).

  Here are the available tasks:
  {{#each tasks}}
  - Title: {{this.title}}
    Description: {{this.description}}
    Estimated Completion Time: {{this.estimatedCompletionTime}} minutes
    Payout: {{this.payout}}
  {{/each}}

  Return the task bundles.
  Make sure the task bundles are not empty.
  `,
});

const smartTaskBundlingFlow = ai.defineFlow(
  {
    name: 'smartTaskBundlingFlow',
    inputSchema: SmartTaskBundlingInputSchema,
    outputSchema: SmartTaskBundlingOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
