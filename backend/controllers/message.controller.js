import Conversation from "../models/conversation.model";
import Message from "../models/message.model";
// import socket.io here



export const sendMessage = async( req,res)=>{
    try{
        const {message}= req.body;
        const{id: recieverId}= req.params;
        const senderId= req.user_id;
        //find the conversation between sender and reciever in the database
        let conversation = await Conversation.findOne({
            participants: {$all: [senderId, recieverId]},
        });
        // if no conversation is found create a conversation and store into database
        if(!conversation){
            conversation= await Conversation.create({
                paricipants: [senderId, recieverId],
            })
        }
         // To create new messages and save it to the message collection of the databse
        const newMessage= new Message({
              senderId,
              recieverId,
              message
        });
        // If a new message is found push it to the converstions collection
        if(newMessage){
                 conversation.messages.push(newMessage._id);
        }
        // await conversation.save();
		// await newMessage.save();

		// this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

        
        // // SOCKET IO FUNCTIONALITY WILL GO HERE
		// const receiverSocketId = getReceiverSocketId(receiverId);
		// if (receiverSocketId) {
		// 	// io.to(<socket_id>).emit() used to send events to specific client
		// 	io.to(receiverSocketId).emit("newMessage", newMessage);
		// }

		// res.status(201).json(newMessage);
    }catch(error){
          console.log("Error in sendMessage controller:", error.message);
          res.status(500).json({error: "Internal Server error"});
    }
};


export const getMessages = async(req,res)=>{
    try{
        const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
    }catch(error){
        console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}

