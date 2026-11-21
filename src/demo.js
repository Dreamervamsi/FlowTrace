#!/usr/bin/env node
import * as p from '@clack/prompts';
import { program } from 'commander';
import chalk from 'chalk';

program
    .version('1.0.0')
    .description('Tool that helps to trace your project workflow')
    
p.intro(chalk.bgBlue.white(" Welcome to FlowTrace "));

async function main() {
  let geminiApiKey;

  const clientTechStack = await p.select({
    message: 'Pick the tech stack of your frontend',
    options: [
        {value: 'React', label: 'React Vite'},
        {value: 'Next.js', label: 'Next.js'},
        {value: 'html', label: 'HTML'}
    ]
  });
  const serverTechStack = await p.select({
    message: "Pick the tech stack of your backend",
    options: [
        {value: 'nodejs', label: 'Node.js'},
        {value: 'fastapi', label: 'FastAPI(Python)'},
        {value: 'java', label: 'SpringBoot(Java)'},
        {value: 'go', label: 'Go'}
    ]
  });
  const aiIntegration = await p.select({
    message: "Enable AI-assisted analysis?",
    options: [
        {value: "yes", label: 'Yes(Gemini)'},
        {value: "No", label: 'No'},
    ]
  });
  if(aiIntegration == 'yes'){
    geminiApiKey = await p.password({
      message: "Please enter your Gemini API key:",
      mask: '*',
      validate(value){
        if(value.length == 0) return 'Enter valid API key'
      }
    });
  }
  p.outro(`Thanks for choosing : ${serverTechStack}`);
}
program.parse(process.argv);
main();


