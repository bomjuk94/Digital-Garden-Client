import { jane, jennifer, xavier, christine, bob } from '@assets/customers'
import type { Customer } from "./types";

export const customers: Customer[] = [
    {
        id: 'customer-jane',
        name: 'Jane',
        image: jane,
        plantName: undefined,
        plantLabel: undefined,
        plant: undefined,
        purchasePrice: undefined,
        timer: 30,
        hasResponded: false,
        dialogue: {
            smallTalk: [
                'This one’s going right in the kitchen window. Maybe it’ll inspire me to cook something green for once.',
                'My little one named it already… hope ‘Captain Sprout’ likes storytime.',
                'It just felt like the kind of plant that listens when you talk to it, you know ?',
            ],
            oneLiners: [
                "Hope it likes sunlight as much as I do my morning tea.",
                "Guess I’ll need to dust off my watering can.",
                "This little guy’s going to make the place feel more alive.",
            ],
        }
    },
    {
        id: 'customer-jennifer',
        name: 'Jennifer',
        image: jennifer,
        plantName: undefined,
        plantLabel: undefined,
        plant: undefined,
        purchasePrice: undefined,
        timer: 30,
        hasResponded: false,
        dialogue: {
            smallTalk: [
                "I’ve been hunting for this variety for weeks. The color saturation is unreal.",
                "Once I get it home, I’m repotting it in terra cotta and misting it daily. Yes, I have a calendar.",
                "This one’s totally going to be the centerpiece of my grow shelf. Welcome to the collection."
            ],
            oneLiners: [
                "Perfect addition — my grow shelf just leveled up.",
                "I’ll have this repotted before dinner, guaranteed.",
                "Finally! The missing piece to my plant puzzle.",
            ],
        }
    },
    {
        id: 'customer-xavier',
        name: 'Xavier',
        image: xavier,
        plantName: undefined,
        plantLabel: undefined,
        plant: undefined,
        purchasePrice: undefined,
        timer: 30,
        hasResponded: false,
        dialogue: {
            smallTalk: [
                "Whoa… this plant’s got chill vibes. I think we were meant to find each other.",
                "I’m not sure if it’s talking to me or if I just skipped lunch… but either way, we’re connected.",
                "Gonna let this little buddy soak up some sun and some jazz when we get home."
            ],
            oneLiners: [
                "Yeah… this one’s got a good aura.",
                "Feels like it chose me, honestly.",
                "Can’t wait to let it vibe by the window.",
            ],
        }
    },
    {
        id: 'customer-christine',
        name: 'Christine',
        image: christine,
        plantName: undefined,
        plantLabel: undefined,
        plant: undefined,
        purchasePrice: undefined,
        timer: 30,
        hasResponded: false,
        dialogue: {
            smallTalk: [
                "If this thing survives my 70-hour workweek, I’ll promote it to Director of Office Morale.",
                "It’s green, it’s alive, and it doesn’t send follow-up emails. Sold.",
                "I read somewhere that plants reduce burnout. Worth a shot, right?"
            ],
            oneLiners: [
                "Time to see if I can actually keep something alive.",
                "If it thrives, maybe I will too.",
                "Adding 'plant parent' to my resume.",
            ],
        }
    },
    {
        id: 'customer-bob',
        name: 'Bob',
        image: bob,
        plantName: undefined,
        plantLabel: undefined,
        plant: undefined,
        purchasePrice: undefined,
        timer: 30,
        hasResponded: false,
        dialogue: {
            smallTalk: [
                "Looks sturdy. If it grows half as well as it smells, we’re in business.",
                "Not sure if it’ll hold up through frost, but I’ll give it a fair shot.",
                "My gran used to grow something like this. Let’s see if I’ve still got the touch."
            ],
            oneLiners: [
                "We’ll see if these old hands still have some magic.",
                "Nothing a little sunlight and patience can’t fix.",
                "This’ll either thrive or teach me humility.",
            ],
        }
    },
]