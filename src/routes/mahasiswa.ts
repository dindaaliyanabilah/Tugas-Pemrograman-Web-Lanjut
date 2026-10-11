import { Elysia } from "elysia";

const mahasiswa = [
    {
        id: 1,
        nama: "Ahmad",
        email: "ahmad@example.com",
        jurusan: "Teknik Informatika"
    },
    {
        id: 2,
        nama: "Anisa",
        email: "anisa@example.com",
        jurusan: "Manajemen Informatika"
    },
    {
        id: 3,
        nama: "Andika",
        email: "andika@example.com",
        jurusan: "Teknik Informatika"
    }
];

export const mahasiswaRoute = new Elysia({
    prefix: "/mahasiswa"
});

mahasiswaRoute.get("/:id", ({ params }) => {
    const mahasiswaId = params.id;
    const data = mahasiswa.find(m => m.id === parseInt(mahasiswaId));
    if (data) {
        return data;
    } else {
        return { error: "Mahasiswa tidak ditemukan" };
    }
});

mahasiswaRoute.post("/", ({ params, body }) => {
    if (body) {
        return body;
    } else {
        return { error: "Tidak ada data yang masuk" };
    }
});

mahasiswaRoute.put("/:id", ({ params, body }) => {
    const mahasiswaId = parseInt(params.id);
    const data = mahasiswa.find(m => m.id === mahasiswaId);

    if (data) {
        const input = body as {
            nama: string;
            email: string;
            jurusan: string;
        };

        Object.assign(data, {
            nama: input.nama,
            email: input.email,
            jurusan: input.jurusan
        });

        return {
            message: "Data mahasiswa berhasil diubah",
            data
        };
    } else {
        return { error: "Mahasiswa tidak ditemukan" };
    }
});

mahasiswaRoute.patch("/:id", ({ params, body }) => {
    const mahasiswaId = parseInt(params.id);
    const data = mahasiswa.find(m => m.id === mahasiswaId);

    if (data) {
        Object.assign(data, body);

        return {
            message: "Sebagian data mahasiswa berhasil diubah",
            data
        };
    } else {
        return { error: "Mahasiswa tidak ditemukan" };
    }
});

mahasiswaRoute.delete("/:id", ({ params }) => {
    const mahasiswaId = parseInt(params.id);
    const index = mahasiswa.findIndex(m => m.id === mahasiswaId);

    if (index !== -1) {
        const data = mahasiswa.splice(index, 1);

        return {
            message: "Data mahasiswa berhasil dihapus",
            data: data[0]
        };
    } else {
        return { error: "Mahasiswa tidak ditemukan" };
    }
});

mahasiswaRoute.route("CONNECT", "/", () => {
    return {
        message: "Request CONNECT berhasil diterima"
    };
});
