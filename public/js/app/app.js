var app = new Vue ({
    el: '#main',
    data: {
        pseudo: 'Personne',
        pathAvatar: '/story-arcs-images/6.jpeg'

    },
    methods: {
        ajouterlettre: function() {
            this.pseudo += 'e'
        }
    }
});