import {
    ClerkUserCreated,
    ClerkUserCreatedSchema,
    ClerkUserDeleted,
} from '@/types/clerk';
import { prisma } from '@/lib/prisma';

export async function createUser(data: ClerkUserCreated) {
    try {
        const userToBeCreated = ClerkUserCreatedSchema.parse(data);

        await prisma.user.create({
            data: {
                external_id: userToBeCreated.id,
                first_name: userToBeCreated.first_name,
                last_name: userToBeCreated.last_name,
            },
        });

        console.log('User created successfully');
    } catch (error) {
        console.error('Error while creating user', error);
    }
}

export async function deleteUser(data: ClerkUserDeleted) {
    try {
        const userToBeDeleted = ClerkUserCreatedSchema.parse(data);

        const foundUser = await prisma.user.findFirst({
            where: {
                external_id: userToBeDeleted.id,
            },
        });

        if (!foundUser) {
            return console.log('User not found');
        }

        await prisma.user.delete({
            where: {
                id: foundUser.id,
            },
        });
    } catch (error) {
        console.error('Error while deleting user', error);
    }
}
