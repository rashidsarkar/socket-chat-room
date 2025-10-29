import httpStatus from "http-status";
import AppError from "../../error/appError";
import { IStudent } from "./student.interface";
import studentModel from "./student.model";

const updateUserProfile = async (id: string, payload: Partial<IStudent>) => {
    if (payload.email || payload.username) {
        throw new AppError(httpStatus.BAD_REQUEST, "You cannot change the email or username");
    }
    const user = await studentModel.findById(id);
    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "Profile not found");
    }
    return await studentModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
};

const StudentServices = { updateUserProfile };
export default StudentServices;