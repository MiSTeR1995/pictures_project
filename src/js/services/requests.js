// async await - позволяет дождаться результата запроса
const postData = async (url, data) => {
    let result = await fetch(url, {
        method: 'POST',
        body: data,
    });

    // тут тоже дождаться выполнения
    return await result.text();
};

const getResource = async (url) => {
    let result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }
    // тут тоже дождаться выполнения
    return await result.json();
};

export { postData, getResource };
