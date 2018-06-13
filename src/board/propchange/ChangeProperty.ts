class ChangeProperty {

    /**
     * Determining if a mutated object has changed is complex
     */
    public changeByMutating(): any {
        const player = { type: 'mutating', score: 1, name: 'Jeff' };
        player.score = 2;
        return player;
    }

    /**
     * without mutating
     */
    public changeByNotMutating(): any {
        const player = { type: 'spread...', score: 1, name: 'Jeff' };
        return {...player, ...{score : 2}};
        // Use the object spread operator instead.
        // return Object.assign({}, player, { score: 2 });
    }
}

export default ChangeProperty;
