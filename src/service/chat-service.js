import {validate} from "../validation/validation.js";
import {
    createChatValidation,
} from "../validation/chat-validation.js";
import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response-error.js";

const create = async (user, request) => {
    const chat = validate(createChatValidation, request);
    chat.id_sender = user.id;
    const adminUsers = await prismaClient.user.findMany({
        where: {
          role: 2,
        },
      });
    
      // Kirim pesan kepada setiap admin
      const createdChatMessages = [];
      for (const adminUser of adminUsers) {
        const createdChatMessage = await prismaClient.chat.create({
          data: {
            ...chat,
            id_receiver: adminUser.id,
          },
        select: {
            id_sender: true,
            id_receiver: true,
            message: true
        }
    });
    createdChatMessages.push(createdChatMessage);
}

return createdChatMessages;
};

const get = async (user) => {
    const chat = await prismaClient.chat.findMany({
        where: {
            id_sender: user.id,
        },
        select: {
            id_sender: true,
            id_receiver: true,
            message: true
        }
    });

    if (!chat) {
        throw new ResponseError(404, "chat is not found");
    }

    return chat;
}




export default {
    create,
    get
}
