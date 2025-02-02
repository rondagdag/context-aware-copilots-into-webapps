import {
    CopilotRuntime,
    OpenAIAdapter,
    copilotRuntimeNextJSAppRouterEndpoint,
  } from '@copilotkit/runtime';
  import OpenAI from 'openai/index.mjs';
  import { NextRequest } from 'next/server';
  import { getAzureOpenAIAdapter, getGroqAdapter, getLangChainAzureOpenAIAdapter, getLangChainGithubOpenAIAdapter, getLangChainOllamaAdapter, getLangChainOllamaDeepSeekAdapter, getLangChainOllamaPhiAdapter, getOpenAIAdapter } from "./adapter"

  const runtime = new CopilotRuntime();

  export const POST = async (req: NextRequest) => {
    const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
      runtime,
      //serviceAdapter: await getLangChainAzureOpenAIAdapter(),
      //serviceAdapter: await getOpenAIAdapter(),
      //serviceAdapter: await getLangChainAzureOpenAIAdapter(),
      //serviceAdapter: await getAzureOpenAIAdapter(),
      //serviceAdapter: await getGroqAdapter(),
      //serviceAdapter: await getLangChainOllamaAdapter(),
      //serviceAdapter: await getLangChainOllamaPhiAdapter(),
      //serviceAdapter: await getLangChainOllamaDeepSeekAdapter(),
      serviceAdapter: await getLangChainGithubOpenAIAdapter(),
      endpoint: req.nextUrl.pathname,
    });
   
    return handleRequest(req);
  };