import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    _id?: Types.ObjectId;

    @Prop({ required: true })
    userName: string

    @Prop({ required: true })
    password: string

    @Prop()
    email?: string;

    @Prop({ default: false })
    isVerified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User)