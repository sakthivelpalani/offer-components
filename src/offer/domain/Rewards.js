export default class Rewards {

    constructor(rewards) {
        this.rewards = rewards;
    }

    getOneLinerRewardText() {
        return this.rewards.oneliner && this.rewards.oneliner.text;
    }

    getOneLinerRewardType() {
        return this.rewards.oneliner && this.rewards.oneliner.type;
    }

    getOtherRewards() {
        this.rewards.other;
    }

    getType() {
        return "Rewards";
    } 
}