import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'openai';
import { NextResponse } from 'next/server';
import { stat } from 'fs';
require("dotenv").config()
 
// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
 
// Set the runtime to edge for best performance
export const runtime = 'edge';
 
export async function POST(req: Request) {
  
}