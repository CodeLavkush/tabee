import conf from "../conf/conf";



async function userChatList() {
    const options = {method: 'GET', headers: {accept: 'application/json'}, credentials: 'include'};
    
    try {
        const response = await fetch(conf.chatUrl, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error while getting chat list ", error)
    }
}

async function getAvailableUsers() {
    const options = {method: 'GET', headers: {accept: 'application/json'}, credentials: 'include'};
    
    try {
        const response = await fetch(`${conf.chatUrl}/users`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error while getting availavle users ", error)
    }
}

async function createOrGetChatOneOnOne(receiverId) {
    const options = {method: 'POST', headers: {accept: 'application/json'}, credentials: 'include'};
    
    try {
        const response = await fetch(`${conf.chatUrl}/c/${receiverId}`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error while getting chat list ", error)
    }
}

async function deleteOneOnOneChat(chatId) {
    const options = {method: 'DELETE', headers: {accept: 'application/json'}, credentials: 'include'};
    
    try {
        const response = await fetch(`${conf.chatUrl}/remove/${chatId}`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error while deleting chat", error)
    }
}

async function createGroupChat(groupInfo) {
    const options = { method: 'POST', headers: {accept: 'application/json', 'content-type': 'application/json'}, body: JSON.stringify(groupInfo), credentials: 'include'}

    try {
        const response = await fetch(`${conf.chatUrl}/group`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error creating group chat", error)
    }
}

async function getGroupChatDetails(chatId) {
    const options = { method: 'GET', headers: {accept: 'application/json'}, credentials: 'include'}

    try {
        const response = await fetch(`${conf.chatUrl}/group/${chatId}`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error get group details", error)
    }
}

async function deleteGroupChat(chatId) {
    const options = { method: 'DELETE', headers: {accept: 'application/json'}, credentials: 'include'}

    try {
        const response = await fetch(`${conf.chatUrl}/group/${chatId}`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error while deleting group chat ", error)
    }
}

async function updateGroupChatName(chatId, groupName) {
    const options = { method: 'PATCH', headers: {accept: 'application/json', 'content-type': 'application/json'}, body: JSON.stringify(groupName), credentials: 'include'};

    try {
        const response = await fetch(`${conf.chatUrl}/group/${chatId}`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error while updating group chat name ", error)
    }
}

async function addParticipantToGroup(chatId, participantId) {
    const options = {method: 'POST', headers: {accept: 'application/json'}, credentials: 'include'};

    try {
        const response = await fetch(`${conf.chatUrl}/group/${chatId}/${participantId}`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error while adding participant to group ", error)
    }
}

async function removeParticipantFromGroup(chatId, participantId) {
    const options = {method: 'DELETE', headers: {accept: 'application/json'}, credentials: 'include'};

    try {
        const response = await fetch(`${conf.chatUrl}/group/${chatId}/${participantId}`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error while removing participant from group ", error)
    }
}

async function leaveGroupChat(chatId) {
    const options = {method: 'DELETE', headers: {accept: 'application/json'}, credentials: 'include'};

    try {
        const response = await fetch(`${conf.chatUrl}/leave/group/${chatId}`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error while leaving from group ", error)
    }
}

async function getAllMessages(chatId) {
    const options = {method: 'GET', headers: {accept: 'application/json'}, credentials: 'include'};

    try {
        const response = await fetch(`${conf.messagesUrl}/${chatId}`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error getting all messages ", error)
    }
}

async function sendMessage(chatId, content) {

    const formData = new FormData();
    formData.append('content', content);

    const options = { method: 'POST', headers: {accept: 'application/json',}, body: formData, credentials: 'include'}

    try {
        const response = await fetch(`${conf.messagesUrl}/${chatId}`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error sending message ", error)
    }
}

async function deleteChatMessage(chatId, messageId) {
    const options = {method: 'DELETE', headers: {accept: 'application/json'}, credentials: 'include'};

    try {
        const response = await fetch(`${conf.messagesUrl}/${chatId}/${messageId}`, options)
        
        if(!response.ok){
            console.error("API request failed with status: ", response.status)
        }

        const apiData = await response.json()

        if(!apiData.data){
            console.error(apiData.message)
            return null
        }

        return apiData
    } catch (error) {
        console.error("Error deleting message ", error)
    }
}

export {
    userChatList,
    getAvailableUsers,
    createOrGetChatOneOnOne,
    deleteOneOnOneChat,
    createGroupChat,
    getGroupChatDetails,
    deleteGroupChat,
    updateGroupChatName,
    addParticipantToGroup,
    removeParticipantFromGroup,
    leaveGroupChat,
    getAllMessages,
    sendMessage,
    deleteChatMessage,
}