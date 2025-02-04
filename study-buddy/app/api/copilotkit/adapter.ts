/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getOpenAIAdapter() {
  const { OpenAIAdapter } = await import("@copilotkit/runtime");
  const { OpenAI } = await import("openai");
  //return new OpenAIAdapter();
  const openai = new OpenAI();
  return new OpenAIAdapter({ openai });
}

export async function getAzureOpenAIAdapter() {
  const { OpenAIAdapter } = await import("@copilotkit/runtime");
  const { AzureOpenAI } = await import("openai");
  const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];
  const apiKey = process.env["AZURE_OPENAI_API_KEY"];
  const apiVersion = process.env["AZURE_OPENAI_API_VERSION"];
  const deployment = process.env["AZURE_OPENAI_API_DEPLOYMENT_NAME"]; // This must match your deployment name
  const openai = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });
  return new OpenAIAdapter({ openai });
}

export async function getLangChainOpenAIAdapter() {
  const { LangChainAdapter } = await import("@copilotkit/runtime");
  const { ChatOpenAI } = await import("@langchain/openai");
  return new LangChainAdapter({
    chainFn: async ({ messages, tools }) => {
      const model = new ChatOpenAI({
        modelName: "gpt-4",
        apiKey: process.env.OPENAI_API_KEY,
      }).bind(tools as any) as any;
      return model.stream(messages, { tools });
    },
  });
}

export async function getLangChainOllamaAdapter() {
  const { LangChainAdapter } = await import("@copilotkit/runtime");
  const { ChatOllama } = await import("@langchain/ollama");
  return new LangChainAdapter({
    chainFn: async ({ messages, tools }) => {
      const model = new ChatOllama({
        model: "llama3-groq-tool-use", // Default value
        temperature: 0
      }).bind(tools as any) as any;
      return model.stream(messages, { tools });
    },
  });
}

export async function getLangChainOllamaPhiAdapter() {
  const { LangChainAdapter } = await import("@copilotkit/runtime");
  const { ChatOllama } = await import("@langchain/ollama");
  return new LangChainAdapter({
    chainFn: async ({ messages, tools }) => {
      const model = new ChatOllama({
        model: "zac/phi4-tools", // Default value
        temperature: 0,
      }).bindTools(tools as any) as any;
      return model.stream(messages, { tools });
    },
  });
}

export async function getLangChainOllamaDeepSeekAdapter() {
  const { LangChainAdapter } = await import("@copilotkit/runtime");
  const { ChatOllama } = await import("@langchain/ollama");
  return new LangChainAdapter({
    chainFn: async ({ messages, tools }) => {
      const model = new ChatOllama({
        model: "MFDoom/deepseek-r1-tool-calling:1.5b", // Default value
        temperature: 0,
      }).bindTools(tools as any) as any;
      return model.stream(messages, { tools });
    },
  });
}


export async function getLangChainAzureOpenAIAdapter() {
  const { LangChainAdapter } = await import("@copilotkit/runtime");
  const { AzureChatOpenAI } = await import("@langchain/openai");
  return new LangChainAdapter({
    chainFn: async ({ messages, tools }) => {
      const model = new AzureChatOpenAI({
        model: "gpt-4o",
        temperature: 0,
        maxTokens: undefined,
        maxRetries: 2}).bind(tools as any) as any;
      return model.stream(messages, { tools });
    },
  });
}

export async function getGroqAdapter() {
  const { Groq } = await import("groq-sdk");
  const groq = new Groq({ apiKey: process.env["GROQ_API_KEY"] }) as any;
  const { GroqAdapter } = await import("@copilotkit/runtime");
  return new GroqAdapter({ groq, model: "llama-3.3-70b-versatile" });
}


export async function getLangChainGithubOpenAIAdapter() {
  const { LangChainAdapter } = await import("@copilotkit/runtime");
  const { ChatOpenAI } = await import("@langchain/openai");
  return new LangChainAdapter({
    chainFn: async ({ messages, tools }) => {
      const model = new ChatOpenAI({
        modelName: "gpt-4o",
        apiKey: process.env.GITHUB_OPENAI_API_KEY,
        configuration: {
          baseURL: 'https://models.inference.ai.azure.com'
        }
      }).bind(tools as any) as any;
      return model.stream(messages, { tools });
    },
  });
}
