class PostResource {
    update(data) {
        return this._getMessage("Данные синхронизированы", data);
    }

    get(data) {
        return this._getMessage("Последня синхронизация", data);
    }

    any(data) {
        return this._getMessage("Данные синхронизации", data);
    }

    _getMessage(title, data) {
        return {
            title: `${title}: ${data.date}`,
            content: [
                [ "Статус", data.status ],
                [ "Категорий синхронизировано", data.cats.synced ],
                [ "Продуктов добавленно", data.products.added ],
                [ "Продуктов обновленно", data.products.updated ],
                [ "Продуктов нет в наличии", data.products.notInStock || null ]
            ].reduce((str, [ title, value ]) => {
                if(value !== null) str += `${title}: ${value}\n`;
                return str;
            }, "")
        };
    }
}

export default new PostResource();