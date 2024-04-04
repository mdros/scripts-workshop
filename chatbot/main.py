import discord
import os
from rasa.core.agent import Agent
from pathlib import Path
from rasa.utils.endpoints import EndpointConfig


class DiscordConnector(discord.Client):
    def __init__(self, rasa_agent: Agent, *args, **kwargs):
        intents = discord.Intents.default()
        intents.message_content = True

        super().__init__(intents=intents, *args, **kwargs)

        self.rasa_agent = rasa_agent

    async def on_ready(self):
        print(f"We have logged in as {self.user}")

    async def on_message(self, message):
        if message.author == self.user:
            return

        if message.content.startswith("!rasa"):
            user_id = str(message.author.id)
            text = message.content[6:]
            response = await self.rasa_agent.handle_text(text, sender_id=user_id)
            await message.channel.send(response[0]["text"])


# Load your trained Rasa model
rasa_agent = Agent.load(
    Path(
        "/Users/michaldros/dev/university/scripts_workshop/chatbot/rasa/models/20240404-230521-instant-pheasant.tar.gz"
    ),
    action_endpoint=EndpointConfig(url="http://localhost:5055/webhook"),
)

discord_token = os.environ.get("DISCORD_TOKEN", "")

# Initialize and run the Discord bot
discord_connector = DiscordConnector(rasa_agent)
discord_connector.run(discord_token)
