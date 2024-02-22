const OrderStatus = {
    Open: "OPEN",
    Approved: "APPROVED",
    Confirmed: "CONFIRMED",
    Sent: "SENT",
    Completed: "COMPLETED",
    Cancelled: "CANCELLED",
}

export const products = [
{
    description: "Short Product Description1",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 24,
    title: "Barbie Doll",
},
{
    description: "Short Product Description7",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a1",
    price: 15,
    title: "Soldier Toy",
},
{
    description: "Short Product Description2",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80a3",
    price: 23,
    title: "Dinosaur Toy",
},
{
    description: "Short Product Description4",
    id: "7567ec4b-b10c-48c5-9345-fc73348a80a1",
    price: 15,
    title: "Robot Toy",
},
{
    description: "Short Product Descriptio1",
    id: "7567ec4b-b10c-48c5-9445-fc73c48a80a2",
    price: 23,
    title: "Tiger Toy",
},
{
    description: "Short Product Description7",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 15,
    title: "Teddy Bear",
},
];

export const availableProducts = products.map(
(product, index) => ({ ...product, count: index + 1 })
);

export const cart = [
{
    product: {
    description: "Short Product Description1",
    id: "7567ec4b-b10c-48c5-9345-fc73c48a80aa",
    price: 24,
    title: "Barbie Doll",
    },
    count: 2,
},
{
    product: {
    description: "Short Product Description7",
    id: "7567ec4b-b10c-45c5-9345-fc73c48a80a1",
    price: 15,
    title: "ProductName",
    },
    count: 5,
},
];

export const orders = [
{
    id: "1",
    address: {
    address: "some address",
    firstName: "Name",
    lastName: "Surname",
    comment: "",
    },
    items: [
    { productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa", count: 2 },
    { productId: "7567ec4b-b10c-45c5-9345-fc73c48a80a1", count: 5 },
    ],
    statusHistory: [
    { status: OrderStatus.Open, timestamp: Date.now(), comment: "New order" },
    ],
},
{
    id: "2",
    address: {
    address: "another address",
    firstName: "John",
    lastName: "Doe",
    comment: "Ship fast!",
    },
    items: [{ productId: "7567ec4b-b10c-48c5-9345-fc73c48a80aa", count: 3 }],
    statusHistory: [
    {
        status: OrderStatus.Sent,
        timestamp: Date.now(),
        comment: "Fancy order",
    },
    ],
},
];
