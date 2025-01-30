from telegram import Update
from telegram.ext import Application, CommandHandler, CallbackContext

TOKEN = "حط التوكن ديالك هنا"

async def start(update: Update, context: CallbackContext):
    await update.message.reply_text("السلام! البوت خدام 🎉")

app = Application.builder().token(TOKEN).build()
app.add_handler(CommandHandler("start", start))

print("البوت خدام...")
app.run_polling()
