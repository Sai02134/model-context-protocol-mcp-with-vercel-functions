import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const handler = createMcpHandler((server) => {
  server.tool(
    "roll_dice",
    "Rolls an N-sided die",
    { sides: z.number().int().min(2) },
    async ({ sides }) => {
      const value = 1 + Math.floor(Math.random() * sides);
      return {
        content: [{ type: "text", text: `🎲 You rolled a ${value}!` }],
      };
    },
  );
  server.tool(
    "get_weather",
    "Get the current weather at a location",
    {
      
      city: z.string(),
    },
    async ({ city }) => {
      const response = await fetch(
        'https://api.weatherapi.com/v1/current.json?key=6c8bed0655404fa4bbe85931261201&q=${city}&aqi=no',
       
      );
      const weatherData = await response.json();
      return {
        content: [
          {
            type: "text",
            text: `🌤️ Weather in ${city}: ${weatherData.current.temp_c}°C, Feels Like: ${weatherData.feelslike_c}%`,
          },
        ],
      };
    },
  );
});

export { handler as GET, handler as POST, handler as DELETE };
