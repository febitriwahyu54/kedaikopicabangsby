document.addEventListener('alpine:init', () => {
    Alpine.data('products', () => ({
        items: [
            {id: 1, name: 'bluebottlecofee', img: 'product1.jpg', price: 20000},
            {id: 2, name: 'latte', img: 'product2.png', price: 25000},
            {id: 3, name: 'starbuck', img: 'product3.jpg', price: 30000},
            {id: 4, name: 'oak&bondcofee', img: 'product4.jpg', price: 40000},
            {id: 5, name: 'boardingpascofee', img: 'product5.jpg', price: 38000},
            {id: 6, name: 'arabica', img: 'product6.jpg', price: 50000}
        ],
       
    }));

    Alpine.store('cart', {
        items: [],
        total: 0,
        quantity: 0,

        add(newItem) {
            // Cek apakah item sudah ada di dalam keranjang
            const cartItem = this.items.find(item => item.id === newItem.id);

            if (!cartItem) {
                // Jika item belum ada, tambahkan sebagai item baru
                this.items.push({...newItem, quantity: 1, total: newItem.price});
            } else {
                // Jika item sudah ada, tingkatkan jumlahnya
                cartItem.quantity++;
                cartItem.total = cartItem.price * cartItem.quantity;
            }

            // Perbarui total harga dan jumlah barang
            this.quantity++;
            this.total += newItem.price;
        },

        remove(id) {
            // Cari item berdasarkan ID
            const cartItem = this.items.find(item => item.id === id);

            if (!cartItem) return;

            if (cartItem.quantity > 1) {
                // Jika jumlah lebih dari 1, kurangi jumlahnya
                cartItem.quantity--;
                cartItem.total = cartItem.price * cartItem.quantity;
            } else {
                // Jika hanya 1, hapus dari keranjang
                this.items = this.items.filter(item => item.id !== id);
            }

            // Perbarui total harga dan jumlah barang
            this.quantity--;
            this.total -= cartItem.price;
        },
    });
});

// Konversi angka ke format Rupiah
const rupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: "currency",
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(number);
};

// komentar
function commentSection() {
    return {
        comments: [
            { id: 1, name: "iqbalmuttaqin", comment: "Kopi ini enak banget!", replies: [] }
        ],
        newComment: "",
        replyComment: "",
        replyIndex: null,

        addComment() {
            if (this.newComment.trim() === "") return;
            this.comments.push({
                id: Date.now(),
                name: "Buyer", // Ubah sesuai user login
                comment: this.newComment,
                replies: []
            });
            this.newComment = "";
        },

        toggleReply(index) {
            this.replyIndex = this.replyIndex === index ? null : index;
        },

        addReply(index) {
            if (this.replyComment.trim() === "") return;
            this.comments[index].replies.push({
                id: Date.now(),
                name: "Buyer", // Ubah sesuai user login
                comment: this.replyComment
            });
            this.replyComment = "";
            this.replyIndex = null;
        }
    };
}

