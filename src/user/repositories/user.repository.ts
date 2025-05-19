import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schema/user.schema";
import { UserDocument } from "../schema/user.schema";
import { Model } from 'mongoose';
import { CreateUserDto } from "../dto/create-user.dto";
@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) { }

    async findAll(): Promise<UserDocument[]> {
        return this.userModel.find().exec();
    }

    async findById(id: string): Promise<UserDocument | null> {
        return this.userModel.findById(id).exec();
    }

    async findByUserName(userName: string): Promise<UserDocument | null> {
        return this.userModel.findOne({ userName }).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<UserDocument> {
        const newUser = new this.userModel(createUserDto);
        return newUser.save()
    }

    async update(id: string, updateUserDto: Partial<UserDocument>): Promise<UserDocument | null> {
        return this.userModel
            .findByIdAndUpdate(id, updateUserDto, { new: true })
            .exec();
    }

    async delete(id: string): Promise<UserDocument | null> {
        return this.userModel.findByIdAndDelete(id).exec();
    }
}