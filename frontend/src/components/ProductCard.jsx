function ProductCard({ data }) {
    const { name, brand, categories, image_url, nutriments } = data;

    return (
        <div className="product-card">
            <h2>{name}</h2>
            <p><strong>Brand:</strong> {brand}</p>
            <p><strong>Categories:</strong> {categories}</p>
            <img src={image_url} alt={name} width={150} />
            <ul>
                {Object.entries(nutriments).map(([key, value]) => (
                    <li key={key}><strong>{key}:</strong> {value}</li>
                ))}
            </ul>
        </div>
    );
}
