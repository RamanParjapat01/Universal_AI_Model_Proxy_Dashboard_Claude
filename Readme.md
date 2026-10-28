# 🔀 Universal AI Model Proxy

A lightweight local proxy server and admin dashboard that frees you from single-provider lock-in. Use your favorite AI coding clients—like **Claude Code** and **VS Code (Copilot/Codex extensions)**—with _any_ local or cloud model provider.

Act as a "switchboard" to seamlessly route prompts to cheaper cloud providers (Groq, OpenRouter, DeepSeek) or free local models (Ollama, LM Studio) without ever restarting your CLI or changing your IDE settings.

## ✨ Features

- **Drop-in Compatibility:** Translates Anthropics and OpenAI API requests on the fly.
- **Local Admin Dashboard:** A sleek Web UI to manage API keys, toggle providers, and set default models.
- **Dynamic Routing:** Switch models mid-conversation from the dashboard; your client automatically uses the new brain.
- **Local & Cloud Support:** Works out-of-the-box with Ollama, LM Studio, Groq, OpenRouter, Anthropic, and OpenAI.
- **Privacy First:** Keep API keys out of random dotfiles and route sensitive code strictly to local models.

## 🚀 Installation

Install the proxy globally via npm:

```bash
npm install -g universal-ai-proxy

```

When to Use This Proxy
You should run this proxy whenever you want to decouple the client interface you love (like Claude Code or VS Code) from the backend model provider they force you to use.

Specifically, use it when:

You want to use local models: Route Claude Code's agentic loop through Ollama or LM Studio running on your machine for zero-cost, private coding.

You want cheaper cloud alternatives: Swap expensive first-party API calls for cheaper providers (like Groq, OpenRouter, or DeepSeek) while keeping the exact same CLI experience.

You want centralized billing/auth: Instead of scattering API keys across different dotfiles and IDE settings, you paste them once in the proxy dashboard.

You need fallback routing: If Anthropic or OpenAI goes down, you can instantly flip a switch in your proxy dashboard to route traffic to another provider without touching your IDE settings.

A lightweight local proxy server and admin dashboard that frees you from single-
provider lock-in. Use your favorite AI coding clients—like Claude Code and VS Code
(Copilot/Codex extensions)—with any local or cloud model provider.
Act as a &quot;switchboard&quot; to seamlessly route prompts to cheaper cloud providers (Groq,
OpenRouter, DeepSeek) or free local models (Ollama, LM Studio) without ever restarting
your CLI or changing your IDE settings.

✨ Features
 Drop-in Compatibility: Translates Anthropics and OpenAI API requests on the fly.
 Local Admin Dashboard: A sleek Web UI to manage API keys, toggle providers, and set
default models.
 Dynamic Routing: Switch models mid-conversation from the dashboard; your client
automatically uses the new brain.
 Local &amp; Cloud Support: Works out-of-the-box with Ollama, LM Studio, Groq,
OpenRouter, Anthropic, and OpenAI.
 Privacy First: Keep API keys out of random dotfiles and route sensitive code strictly to
local models.

⚙️ Setup &amp; Configuration Guide

1. Launch the Proxy Server
   Start the local proxy from your terminal:

# Install globally

npm install -g universal-ai-proxy

# Start the server on the default port

ai-proxy start --port 4141

The server will spin up and give you a local dashboard URL. Leave this terminal window
running in the background. 2. Configure Your Providers in the Dashboard
Requires your API keys

1. 1. Open http://localhost:4141/admin in your browser.

2. 2. Navigate to the Providers tab.
3. 3. Toggle on the providers you want to use (e.g., Ollama for local, OpenRouter for cloud).
4. 4. Paste your API keys for the cloud providers and click Save Settings.
5. 5. Go to the Routing tab and set your Default Model (e.g., llama-3.3-70b or deepseek-
      coder).
6. Route Claude Code to the Proxy
   Editing settings.json is required
   Claude Code locks its environment variables at spawn, so you must add the proxy URL to its
   persistent settings file rather than just exporting it in your terminal.
7. 1. Open your Claude settings file: nano ~/.claude/settings.json (or
      C:\Users\YOUR_NAME\.claude\settings.json on Windows).
8. 2. Add the ANTHROPIC_BASE_URL pointing to your local proxy:
      {
      &quot;env&quot;: {
      &quot;ANTHROPIC_BASE_URL&quot;: &quot;http://localhost:4141/anthropic&quot;,
      &quot;ANTHROPIC_API_KEY&quot;: &quot;proxy-auth-token&quot;
      },
      &quot;model&quot;: &quot;proxy-default&quot;
      }

�� Note: The proxy intercepts requests sent to /anthropic, translates them to you
chosen provider&#39;s format, and translates the response back so Claude Code never
knows the difference. 4. Route VS Code (Codex / Copilot) to the Proxy
If you are using an OpenAI-compatible extension (like Continue.dev or standard Codex
integrations), point the endpoint to the proxy&#39;s OpenAI translation layer. 8. 1. Open VS Code Settings (Cmd/Ctrl + ,). 9. 2. Search for your extension&#39;s API Base URL setting. 10. 3. Set the Custom Endpoint to: http://localhost:4141/v1 11. 4. Set the API Key to the local auth token shown in your proxy dashboard (default is
usually proxy-auth-token). 12. 5. Set the model to proxy-default (the proxy will dynamically route it based on your
dashboard settings).

�� Daily Workflow
Once configured, you rarely need to touch your CLI or IDE settings again.

13. 1. Start your day: Run ai-proxy start in a background terminal.
14. 2. Code normally: Launch claude in your project folder or open VS Code.
15. 3. Switch models on the fly: If a local model is struggling with a complex architectural
       problem, open the local proxy dashboard (http://localhost:4141/admin), switch the
       default provider to a heavyweight cloud model, and click Save. Your next prompt in
       Claude Code will automatically route to the smarter model without you having to restart
       the CLI.

�� Tech Stack &amp; License
 Backend: Node.js / Express
 Frontend Dashboard: React, Tailwind CSS, Lucide Icons
 License: MIT License.
