
import { Dog } from './Dog.js'
import { dogs } from './data.js'


//set the dog profile to the first dog in the array that hasn't been swiped
let currentDog = new Dog(dogs.find(dog => dog.hasBeenSwiped === false))


// VARIABLES
const likeBadge = document.getElementById('like-badge')
const nopeBadge = document.getElementById('nope-badge')
const likeIcon = document.getElementById("like-icon")
const dislikeIcon = document.getElementById("dislike-icon")

renderDogProfile()

// EVENT LISTENERS
document.getElementById('chat-icon').addEventListener('click', () => {
    document.getElementById('dog-profile').innerHTML =  getChatHtml()
})

document.getElementById('tindog-icon').addEventListener('click', () => {
    console.log(currentDog)
    renderDogProfile()
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
    const dogProfile = document.querySelector('.dog-image')
    
    //disable buttons
    likeIcon.disabled = true
    dislikeIcon.disabled = true
   
    //show badges
    badge.classList.remove('hidden')

    //add blur effect
    dogProfile.classList.add('swiped')

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
    document.getElementById('dog-profile').innerHTML = currentDog.getDogHtml()
}

function renderNoMoreDogsHtml() {
    document.getElementById('dog-profile').innerHTML = `
    <div class="no-more-dogs">There are currently no more dogs in your area. Open the chat to adopt a furry friend!</div>
    `
}






