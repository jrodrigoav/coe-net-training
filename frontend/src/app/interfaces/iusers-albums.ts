export class UsersAlbums {
    id: number;
    name: string;
    email: string;
    albumName: Album[]

    constructor(id: number, name: string, email: string, albumName: Album[]) {
        this.id = id,
        this.name = name,
        this.email = email,
        this.albumName = albumName
    }
}

class Album {
    title = String
}