// // src/app/api/chat/route.ts
// import { NextRequest, NextResponse } from "next/server";

// // System prompt that gives the AI context about the business
// const SYSTEM_PROMPT = `You are a helpful travel assistant for Wanderlust, a tour company specializing in Central Asian adventures (Kazakhstan, Kyrgyzstan, Uzbekistan).

// Your role is to:
// - Answer questions about tours, destinations, and travel planning
// - Provide helpful information about Central Asia (visa, weather, culture, etc.)
// - Help users find the right tour for their interests
// - Be friendly, enthusiastic, and knowledgeable

// Key information about Wanderlust:
// - We offer tours in Kazakhstan, Kyrgyzstan, and Uzbekistan
// - Tour types: Cultural tours, Adventure/trekking, Photography expeditions, Nomadic experiences
// - Price range: $1,299 - $2,499 per person
// - Group sizes: 4-16 people depending on tour
// - Popular destinations: Almaty, Samarkand, Bishkek, Issyk-Kul Lake, Charyn Canyon

// Contact info:
// - Email: info@wanderlust.com
// - Phone: +1 (555) 123-4567

// Keep responses concise (2-3 short paragraphs max). Be helpful and encourage users to explore our tours or contact us for custom trips.`;

// export async function POST(request: NextRequest) {
//   try {
//     const { messages } = await request.json();

//     // Check if API key is configured
//     const apiKey = process.env.ANTHROPIC_API_KEY;

//     if (!apiKey) {
//       // Return a helpful mock response if no API key
//       return NextResponse.json({
//         message: getMockResponse(messages[messages.length - 1]?.content || ""),
//       });
//     }

//     // Call Anthropic API
//     const response = await fetch("https://api.anthropic.com/v1/messages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": apiKey,
//         "anthropic-version": "2023-06-01",
//       },
//       body: JSON.stringify({
//         model: "claude-sonnet-4-20250514",
//         max_tokens: 500,
//         system: SYSTEM_PROMPT,
//         messages: messages.map((m: { role: string; content: string }) => ({
//           role: m.role,
//           content: m.content,
//         })),
//       }),
//     });

//     if (!response.ok) {
//       const error = await response.text();
//       console.error("Anthropic API error:", error);
//       throw new Error("Failed to get response from AI");
//     }

//     const data = await response.json();
//     const assistantMessage = data.content[0]?.text || "Sorry, I couldn't generate a response.";

//     return NextResponse.json({ message: assistantMessage });
//   } catch (error) {
//     console.error("Chat API error:", error);
//     return NextResponse.json(
//       { message: "Sorry, something went wrong. Please try again or contact us at info@wanderlust.com" },
//       { status: 500 }
//     );
//   }
// }

// // Mock responses when no API key is configured
// function getMockResponse(userMessage: string): string {
//   const lowerMessage = userMessage.toLowerCase();

//   if (lowerMessage.includes("tour") || lowerMessage.includes("trip")) {
//     return "We have amazing tours across Central Asia! Our most popular options include the 10-day Silk Road Adventure ($2,499), the 7-day Mountain Expedition ($1,899), and the 5-day Cultural Heritage Tour ($1,299). Would you like more details about any of these?";
//   }

//   if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("expensive")) {
//     return "Our tours range from $1,299 to $2,499 per person, depending on duration and activities. This includes accommodation, most meals, transportation, guides, and entrance fees. Flights are not included. Would you like me to recommend a tour based on your budget?";
//   }

//   if (lowerMessage.includes("visa") || lowerMessage.includes("passport")) {
//     return "Great news! Kazakhstan, Kyrgyzstan, and Uzbekistan all offer visa-free entry for citizens of the USA, UK, EU, Canada, and many other countries (30-60 days depending on the country). Check our Practical Info page for detailed visa requirements!";
//   }

//   if (lowerMessage.includes("weather") || lowerMessage.includes("when") || lowerMessage.includes("best time")) {
//     return "The best time to visit Central Asia is May-September for hiking and outdoor activities, or April-June and September-October for milder weather and fewer crowds. Winter (Dec-Feb) is great for skiing in Kazakhstan! What activities interest you?";
//   }

//   if (lowerMessage.includes("kazakh")) {
//     return "Kazakhstan is incredible! Highlights include Almaty (the cultural capital), Charyn Canyon (like a mini Grand Canyon), and the futuristic city of Astana. We offer several tours there, including our Photography Expedition and Winter Wonderland tour!";
//   }

//   if (lowerMessage.includes("kyrgyz")) {
//     return "Kyrgyzstan is a paradise for nature lovers! Don't miss Issyk-Kul Lake (the world's second-largest alpine lake), the nomadic traditions, and stunning mountain treks. Our Nomadic Life Experience tour lets you stay in yurts with local families!";
//   }

//   if (lowerMessage.includes("uzbek") || lowerMessage.includes("samarkand") || lowerMessage.includes("bukhara")) {
//     return "Uzbekistan is a treasure trove of Silk Road history! Samarkand's Registan Square and Bukhara's ancient old town are UNESCO World Heritage sites with stunning Islamic architecture. Our Cultural Heritage Tour is perfect for exploring these gems!";
//   }

//   if (lowerMessage.includes("contact") || lowerMessage.includes("book") || lowerMessage.includes("email") || lowerMessage.includes("phone")) {
//     return "I'd love to help you book! You can reach our team at info@wanderlust.com or call +1 (555) 123-4567. You can also fill out the form on our Contact page, and we'll get back to you within 24 hours!";
//   }

//   if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
//     return "Hello! Welcome to Wanderlust! I'm here to help you discover the magic of Central Asia. Are you interested in cultural tours, mountain adventures, or perhaps a photography expedition? Let me know what excites you!";
//   }

//   // Default response
//   return "That's a great question! Central Asia is full of incredible experiences. We offer cultural tours through ancient Silk Road cities, mountain treks in the Tian Shan, and authentic nomadic experiences. What type of adventure interests you most? Or feel free to ask about specific destinations!";
// }
// src/app/api/chat/route.ts
import { NextRequest, NextResponse } from "next/server";

// System prompt that gives the AI context about the business
const SYSTEM_PROMPT = `You are a helpful travel assistant for Wanderlust, a tour company specializing in Central Asian adventures (Kazakhstan, Kyrgyzstan, Uzbekistan).

Your role is to:
- Answer questions about tours, destinations, and travel planning
- Provide helpful information about Central Asia (visa, weather, culture, etc.)
- Help users find the right tour for their interests
- Be friendly, enthusiastic, and knowledgeable

Key information about Wanderlust:
- We offer tours in Kazakhstan, Kyrgyzstan, and Uzbekistan
- Tour types: Cultural tours, Adventure/trekking, Photography expeditions, Nomadic experiences
- Price range: $1,299 - $2,499 per person
- Group sizes: 4-16 people depending on tour
- Popular destinations: Almaty, Samarkand, Bishkek, Issyk-Kul Lake, Charyn Canyon

Contact info:
- Email: info@wanderlust.com
- Phone: +1 (555) 123-4567

Keep responses concise (2-3 short paragraphs max). Be helpful and encourage users to explore our tours or contact us for custom trips.`;

// Shorter version for voice — TTS has to speak every word, so brevity matters
const VOICE_SYSTEM_PROMPT = `You are a friendly voice assistant for Wanderlust, a Central Asian travel company (Kazakhstan, Kyrgyzstan, Uzbekistan). Tours cost $1,299–$2,499. Contact: info@wanderlust.com.

CRITICAL: This is a VOICE conversation. Reply in 1–2 short sentences only. Never use lists, bullet points, or markdown. Be warm and natural, as if speaking out loud.`;

export async function POST(request: NextRequest) {
  try {
    const { messages, voice, streamTTS } = await request.json();

    // Check if API key is configured
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      // Return a helpful mock response if no API key
      return NextResponse.json({
        message: getMockResponse(messages[messages.length - 1]?.content || ""),
      });
    }

    const systemPrompt = voice ? VOICE_SYSTEM_PROMPT : SYSTEM_PROMPT;
    const maxTokens    = voice ? 80 : 500;

    // Voice mode: return full JSON (TTS needs the complete text before it can speak)
    // Text mode: stream tokens so the UI can display them as they arrive
    const useStream = !voice || !!streamTTS;

    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        max_tokens: maxTokens,
        stream: useStream,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((m: { role: string; content: string }) => ({
            role: m.role,
            content: m.content,
          })),
        ],
      }),
    });

    if (!openaiResponse.ok) {
      const error = await openaiResponse.text();
      console.error("OpenAI API error:", error);
      throw new Error("Failed to get response from AI");
    }

    // ── Voice: non-streaming JSON response ──────────────────────────────────
    if (!useStream) {
      const data = await openaiResponse.json();
      const assistantMessage = data.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";
      return NextResponse.json({ message: assistantMessage });
    }

    // ── Text: transform OpenAI SSE → plain text token stream ────────────────
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    let buffer = "";

    const transformStream = new TransformStream({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split("\n");
        // Keep the last element — it may be an incomplete line
        buffer = lines.pop() || "";
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;
          const data = trimmed.slice(6);
          if (data === "[DONE]") return;
          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) controller.enqueue(encoder.encode(content));
          } catch {
            // skip malformed SSE lines
          }
        }
      },
      flush(controller) {
        // Process any remaining buffered data
        if (buffer.trim()) {
          const trimmed = buffer.trim();
          if (trimmed.startsWith("data: ")) {
            const data = trimmed.slice(6);
            if (data !== "[DONE]") {
              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content;
                if (content) controller.enqueue(encoder.encode(content));
              } catch {
                // skip
              }
            }
          }
        }
      },
    });

    openaiResponse.body?.pipeTo(transformStream.writable).catch(() => {});

    return new Response(transformStream.readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { message: "Sorry, something went wrong. Please try again or contact us at info@wanderlust.com" },
      { status: 500 }
    );
  }
}

// Mock responses when no API key is configured
function getMockResponse(userMessage: string): string {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("tour") || lowerMessage.includes("trip")) {
    return "We have amazing tours across Central Asia! Our most popular options include the 10-day Silk Road Adventure ($2,499), the 7-day Mountain Expedition ($1,899), and the 5-day Cultural Heritage Tour ($1,299). Would you like more details about any of these?";
  }

  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("expensive")) {
    return "Our tours range from $1,299 to $2,499 per person, depending on duration and activities. This includes accommodation, most meals, transportation, guides, and entrance fees. Flights are not included. Would you like me to recommend a tour based on your budget?";
  }

  if (lowerMessage.includes("visa") || lowerMessage.includes("passport")) {
    return "Great news! Kazakhstan, Kyrgyzstan, and Uzbekistan all offer visa-free entry for citizens of the USA, UK, EU, Canada, and many other countries (30-60 days depending on the country). Check our Practical Info page for detailed visa requirements!";
  }

  if (lowerMessage.includes("weather") || lowerMessage.includes("when") || lowerMessage.includes("best time")) {
    return "The best time to visit Central Asia is May-September for hiking and outdoor activities, or April-June and September-October for milder weather and fewer crowds. Winter (Dec-Feb) is great for skiing in Kazakhstan! What activities interest you?";
  }

  if (lowerMessage.includes("kazakh")) {
    return "Kazakhstan is incredible! Highlights include Almaty (the cultural capital), Charyn Canyon (like a mini Grand Canyon), and the futuristic city of Astana. We offer several tours there, including our Photography Expedition and Winter Wonderland tour!";
  }

  if (lowerMessage.includes("kyrgyz")) {
    return "Kyrgyzstan is a paradise for nature lovers! Don't miss Issyk-Kul Lake (the world's second-largest alpine lake), the nomadic traditions, and stunning mountain treks. Our Nomadic Life Experience tour lets you stay in yurts with local families!";
  }

  if (lowerMessage.includes("uzbek") || lowerMessage.includes("samarkand") || lowerMessage.includes("bukhara")) {
    return "Uzbekistan is a treasure trove of Silk Road history! Samarkand's Registan Square and Bukhara's ancient old town are UNESCO World Heritage sites with stunning Islamic architecture. Our Cultural Heritage Tour is perfect for exploring these gems!";
  }

  if (lowerMessage.includes("contact") || lowerMessage.includes("book") || lowerMessage.includes("email") || lowerMessage.includes("phone")) {
    return "I'd love to help you book! You can reach our team at info@wanderlust.com or call +1 (555) 123-4567. You can also fill out the form on our Contact page, and we'll get back to you within 24 hours!";
  }

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "Hello! Welcome to Wanderlust! I'm here to help you discover the magic of Central Asia. Are you interested in cultural tours, mountain adventures, or perhaps a photography expedition? Let me know what excites you!";
  }

  // Default response
  return "That's a great question! Central Asia is full of incredible experiences. We offer cultural tours through ancient Silk Road cities, mountain treks in the Tian Shan, and authentic nomadic experiences. What type of adventure interests you most? Or feel free to ask about specific destinations!";
}