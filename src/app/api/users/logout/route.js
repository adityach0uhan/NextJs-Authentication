import createDatabaseConnection from '@/dbConfig/db';
import userModel from '@/model/userModel'
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken"
createDatabaseConnection();