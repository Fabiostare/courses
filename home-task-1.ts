type UserEmail = '${string}@itkachalka.ru' & {
    type: 'UserEmail';
};

const userEmail: UserEmail = 'fabiostare@itkachalka.ru' as UserEmail;

type Product = {
    id: number;
    name: string;
    type: 'FILM' | 'SERIE';
    videoFilePaths: string[];
    price: number;
};

type Shop = {
    money: number;
    products: Product[];
};

type User = {
    id: number;
    name: string;
    money: number;
    products: Product[];
};

const randFilm: Product = {
    id: 1,
    name: 'Random film',
    type: 'FILM',
    videoFilePaths: ['random/path/film.mkv'],
    price: 100,
};

const randSerie: Product = {
    id: 1,
    name: 'Random serie',
    type: 'SERIE',
    videoFilePaths: [
        'random/path/serie1.mkv',
        'random/path/serie2.mkv',
        'random/path/serie3.mkv',
    ],
    price: 300,
};

const shop: Shop = {
    money: 99999999,
    products: [randFilm, randSerie],
};

const checkUserMoneyEnough = (client: User, product: Product) => {
    if (client.money < product.price) {
        throw new Error("User don't have enough money");
    }
};

const checkUserHaveProduct = (seller: User, product: Product): void => {
    if (!seller.products.find((item) => item.id === product.id)) {
        throw new Error("User don't have the current product");
    }
};

const transferMoney = (
    fromUser: User,
    toUser: User | Shop,
    product: Product
) => {
    checkUserMoneyEnough(fromUser, product);
    fromUser.money -= product.price;
    toUser.money += product.price;
    toUser.products.push(product);
};

const buyProduct = (user: User, shop: Shop, product: Product): void => {
    transferMoney(user, shop, product);
};

const addFile = (video: string, product: Product) => {
    product.videoFilePaths.push(video);
};

const buyProductFromUser = (fromUser: User, toUser: User, product: Product) => {
    checkUserHaveProduct(fromUser, product);
    transferMoney(toUser, fromUser, product);

    fromUser.products = fromUser.products.map((userProduct) => {
        if (!(userProduct.id === product.id)) return userProduct;
    });
};
