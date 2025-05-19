import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {

    @Prop({ required: true })
    userName: string
}

export const UserSchema = SchemaFactory.createForClass(User)