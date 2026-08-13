import { useEffect, useRef, useState } from "react";
import {
  Bot,
  Send,
  Sparkles,
  User,
  MessageCircle,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Mentor() {
  const [messages, setMessages] =
    useState<ChatMessage[]>([
      {
        role: "assistant",
        content:
          "Hi! I'm your CareerPath AI Mentor. I can help you with career planning, programming, interviews, projects, internships, GitHub, and job preparation. What would you like help with today?",
      },
    ]);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  /*
   * Used to automatically scroll
   * to the newest message.
   */
  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const suggestions = [
    "Create my career roadmap",
    "How can I improve my resume?",
    "Help me prepare for interviews",
    "What skills should I learn next?",
  ];

  /*
   * Automatically scroll to the
   * latest message.
   */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  /*
   * Send message to backend.
   */
  const handleSend = async () => {
    const trimmedMessage =
      message.trim();

    if (
      !trimmedMessage ||
      loading
    ) {
      return;
    }

    setError("");

    /*
     * Add user message immediately.
     */
    const userMessage: ChatMessage = {
      role: "user",
      content: trimmedMessage,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setMessage("");
    setLoading(true);

    try {
      console.log(
        "🤖 Sending message to AI Mentor..."
      );

      console.log(
        "🌐 API:",
        `${API_URL}/api/mentor/chat`
      );

      const response =
        await fetch(
          `${API_URL}/api/mentor/chat`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              message:
                trimmedMessage,
            }),
          }
        );

      /*
       * Read JSON response.
       */
      const data =
        await response.json();

      console.log(
        "📥 Mentor response:",
        data
      );

      /*
       * Handle HTTP errors.
       */
      if (!response.ok) {
        throw new Error(
          data?.message ||
            "AI Mentor request failed."
        );
      }

      /*
       * Backend response format:
       *
       * {
       *   success: true,
       *   answer: "..."
       * }
       */
      if (
        !data?.answer ||
        typeof data.answer !==
          "string"
      ) {
        throw new Error(
          "AI Mentor returned an empty response."
        );
      }

      /*
       * Add Gemini response.
       */
      const assistantMessage:
        ChatMessage = {
        role: "assistant",
        content: data.answer,
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);

    } catch (err) {
      console.error(
        "❌ AI Mentor error:",
        err
      );

      if (
        err instanceof Error
      ) {
        setError(err.message);
      } else {
        setError(
          "Unable to connect to AI Mentor."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  /*
   * Enter key sends message.
   */
  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSend();
    }
  };

  /*
   * Suggestion button.
   */
  const handleSuggestion = (
    suggestion: string
  ) => {
    setMessage(suggestion);
  };

  return (
    <div className="min-h-screen bg-[#080b18] text-white">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-white/10 px-6 py-6 lg:px-8">

        <div className="mx-auto flex max-w-6xl items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              AI Career Assistant
            </p>

            <h1 className="mt-1 text-2xl font-bold">
              AI Mentor
            </h1>

          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-2">

            <span className="h-2 w-2 rounded-full bg-emerald-400" />

            <span className="text-sm text-emerald-400">
              AI Active
            </span>

          </div>

        </div>

      </div>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="mx-auto w-full max-w-6xl px-6 py-8 lg:px-8">

        {/* ===================================================
            INTRODUCTION
        =================================================== */}

        <section className="rounded-2xl border border-indigo-500/20 bg-gradient-to-r from-indigo-600/20 to-purple-600/10 p-6">

          <div className="flex items-start gap-4">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-600">

              <Sparkles size={24} />

            </div>

            <div>

              <h2 className="text-xl font-semibold">
                Your Personal Career Mentor
              </h2>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-400">
                Get personalized guidance about
                careers, programming, interviews,
                projects, internships, GitHub,
                and job preparation.
              </p>

            </div>

          </div>

        </section>

        {/* ===================================================
            CHAT CONTAINER
        =================================================== */}

        <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#0d1222]">

          {/* =================================================
              CHAT HEADER
          ================================================= */}

          <div className="flex items-center gap-3 border-b border-white/10 px-6 py-4">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600/20">

              <Bot
                size={20}
                className="text-indigo-400"
              />

            </div>

            <div>

              <p className="font-medium">
                CareerPath AI Mentor
              </p>

              <p className="text-xs text-gray-500">
                Powered by Gemini AI
              </p>

            </div>

          </div>

          {/* =================================================
              MESSAGES
          ================================================= */}

          <div className="min-h-[420px] space-y-6 p-6">

            {messages.map(
              (item, index) => (

                <div
                  key={index}
                  className={`flex gap-3 ${
                    item.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  {/* AI ICON */}

                  {item.role ===
                    "assistant" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600/20">

                      <Bot
                        size={18}
                        className="text-indigo-400"
                      />

                    </div>
                  )}

                  {/* MESSAGE BUBBLE */}

                  <div
                    className={`max-w-[80%] rounded-2xl px-5 py-4 text-sm leading-6 ${
                      item.role === "user"
                        ? "bg-indigo-600 text-white"
                        : "border border-white/10 bg-[#111827] text-gray-300"
                    }`}
                  >

                    {item.role ===
                    "assistant" ? (

                      <div className="space-y-3">

                        <ReactMarkdown
                          components={{
                            h1: ({
                              children,
                            }) => (
                              <h1 className="mb-3 mt-2 text-xl font-bold text-white">
                                {children}
                              </h1>
                            ),

                            h2: ({
                              children,
                            }) => (
                              <h2 className="mb-3 mt-4 text-lg font-bold text-white">
                                {children}
                              </h2>
                            ),

                            h3: ({
                              children,
                            }) => (
                              <h3 className="mb-2 mt-4 text-base font-semibold text-white">
                                {children}
                              </h3>
                            ),

                            p: ({
                              children,
                            }) => (
                              <p className="mb-3 leading-7 text-gray-300">
                                {children}
                              </p>
                            ),

                            ul: ({
                              children,
                            }) => (
                              <ul className="mb-3 ml-5 list-disc space-y-1 text-gray-300">
                                {children}
                              </ul>
                            ),

                            ol: ({
                              children,
                            }) => (
                              <ol className="mb-3 ml-5 list-decimal space-y-1 text-gray-300">
                                {children}
                              </ol>
                            ),

                            li: ({
                              children,
                            }) => (
                              <li className="pl-1">
                                {children}
                              </li>
                            ),

                            strong: ({
                              children,
                            }) => (
                              <strong className="font-semibold text-white">
                                {children}
                              </strong>
                            ),

                            em: ({
                              children,
                            }) => (
                              <em className="italic text-gray-200">
                                {children}
                              </em>
                            ),

                            code: ({
                              children,
                            }) => (
                              <code className="rounded bg-black/30 px-1.5 py-0.5 text-xs text-indigo-300">
                                {children}
                              </code>
                            ),

                            blockquote: ({
                              children,
                            }) => (
                              <blockquote className="my-3 border-l-2 border-indigo-500 pl-4 text-gray-400">
                                {children}
                              </blockquote>
                            ),
                          }}
                        >
                          {item.content}
                        </ReactMarkdown>

                      </div>

                    ) : (

                      <p className="whitespace-pre-wrap leading-6">
                        {item.content}
                      </p>

                    )}

                  </div>

                  {/* USER ICON */}

                  {item.role ===
                    "user" && (
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10">

                      <User size={18} />

                    </div>
                  )}

                </div>

              )
            )}

            {/* =================================================
                LOADING INDICATOR
            ================================================= */}

            {loading && (

              <div className="flex gap-3">

                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600/20">

                  <Bot
                    size={18}
                    className="text-indigo-400"
                  />

                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#111827] px-5 py-3">

                  <span className="text-sm text-gray-400">
                    CareerPath AI is thinking
                  </span>

                  <span className="flex gap-1">

                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.3s]" />

                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400 [animation-delay:-0.15s]" />

                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-indigo-400" />

                  </span>

                </div>

              </div>

            )}

            {/* Scroll target */}

            <div
              ref={messagesEndRef}
            />

          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="mx-6 mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">

              {error}

            </div>

          )}

          {/* =================================================
              SUGGESTIONS
          ================================================= */}

          <div className="border-t border-white/10 px-6 py-4">

            <p className="mb-3 text-xs text-gray-500">
              Try asking
            </p>

            <div className="flex flex-wrap gap-2">

              {suggestions.map(
                (suggestion) => (

                  <button
                    key={suggestion}
                    type="button"
                    onClick={() =>
                      handleSuggestion(
                        suggestion
                      )
                    }
                    disabled={loading}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-gray-300 transition hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {suggestion}
                  </button>

                )
              )}

            </div>

          </div>

          {/* =================================================
              INPUT
          ================================================= */}

          <div className="border-t border-white/10 p-4">

            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#080b18] px-4">

              <MessageCircle
                size={19}
                className="shrink-0 text-gray-500"
              />

              <input
                type="text"
                value={message}
                onChange={(event) =>
                  setMessage(
                    event.target.value
                  )
                }
                onKeyDown={
                  handleKeyDown
                }
                placeholder="Ask your AI career mentor..."
                disabled={loading}
                className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-gray-600 disabled:opacity-50"
              />

              <button
                type="button"
                onClick={handleSend}
                disabled={
                  !message.trim() ||
                  loading
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-600 transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
              >

                <Send size={18} />

              </button>

            </div>

            <p className="mt-2 text-center text-[11px] text-gray-600">
              Press Enter to send
            </p>

          </div>

        </section>

      </main>

    </div>
  );
}