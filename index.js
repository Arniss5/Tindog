
import { Dog } from './Dog.js'
import { dogs } from './data.js'


//set the dog profile to the first dog in the array that hasn't been swiped
let currentDog = new Dog(dogs.find(dog => dog.hasBeenSwiped === false))


// VARIABLES
const likeBadge = document.getElementById('like-badge')
const nopeBadge = document.getElementById('nope-badge')
const likeIcon = document.getElementById("like-icon")
const dislikeIcon = document.getElementById("dislike-icon")
const dogProfile = document.getElementById('dog-profile')

renderDogProfile()

// EVENT LISTENERS
document.getElementById('chat-icon').addEventListener('click', () => {
    if (dogs.filter(dog => dog.hasBeenSwiped === true).length < 1) {
        dogProfile.innerHTML = '<div class="chat no-messages">No messages, keep swiping!<div>'
    } else {
        dogProfile.innerHTML =  getChatHtml()
    }
    
    document.getElementById('ratings').style.display = 'none'
})

document.getElementById('tindog-icon').addEventListener('click', () => {
    
    if(dogs.filter(dog => dog.hasBeenSwiped === false).length > 1) {
        renderDogProfile()
    } else {
        renderNoMoreDogsHtml()
    }
    document.getElementById('ratings').style.display = 'flex'
})

document.getElementById('profile-icon').addEventListener('click', () => {
    document.getElementById('ratings').style.display = 'none'
    dogProfile.innerHTML = `
        <div class="user-profile">
            <i class="fa-regular fa-user"></i>
            <p><span class="bold">Name:</span> John Smith</p>
            <p><span class="bold">City:</span> London</p>
            <p><span class="bold">Age:</span> 32</p><br>
            <p class="bold">About: </p>
            <p> I love animals big and small! I work from home and sometimes feel a bit lonely. I live in a house with a garden, would love to share it with a pet or two! </p>
        </div>
    `
})

likeIcon.addEventListener('click', () => {
    handleRatingClick(likeIcon, likeBadge)
})

dislikeIcon.addEventListener('click', () => {
    handleRatingClick(dislikeIcon, nopeBadge)
})


function getChatHtml() {
    let chatHtml =''
    for (let dog of dogs) {
        const {name, avatar, shelter, phone} = dog
        if (dog.hasBeenLiked) {
            chatHtml += `
            <div class="chat">
                <img src="./${avatar}" alt="dog avatar" class="chat-avatar">
                <div>
                    <p class="chat-name">${name}</p>
                    <p class="chat-message">Hey human! I'd love to be your friend! You can find me in <span class="highlight">${shelter}</span>. For more information, please call <span class="highlight">${phone}<span>.</p>
                </div> 
            </div>
            `
        }
    }
    return chatHtml
}


function handleRatingClick(btn, badge) {
    const dogImage = document.querySelector('.dog-image')
    
    //disable buttons
    likeIcon.disabled = true
    dislikeIcon.disabled = true
   
    //show badges
    badge.classList.remove('hidden')

    //add blur effect
    dogImage.classList.add('swiped')

    //enable buttons, hide badges and render next dog after 1s
    setTimeout(() => {
        badge.classList.add('hidden')
        
        if(dogs.filter(dog => dog.hasBeenSwiped === false).length > 1) {
            swipeDog(btn)
            likeIcon.disabled = false
            dislikeIcon.disabled = false
        } else {
            swipeDog(btn)
            renderNoMoreDogsHtml()
        }
    }, 1000)
}

function swipeDog(btn) {
    for (let dog of dogs) {
        if(dog.name == currentDog.name) {
            dog.hasBeenSwiped = true
            if (btn.id === "like-icon") {
                dog.hasBeenLiked = true
            }
        }
    } 
    currentDog = new Dog(dogs.find(dog => dog.hasBeenSwiped === false))
    renderDogProfile()
}

function renderDogProfile() {
    dogProfile.innerHTML = currentDog.getDogHtml()
}

function renderNoMoreDogsHtml() {
    document.getElementById('dog-profile').innerHTML = `
    <div class="no-more-dogs">There are currently no more dogs in your area. Open the chat to adopt a furry friend!</div>
    `
}






