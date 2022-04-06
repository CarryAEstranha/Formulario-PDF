const searchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(searchParams);

console.log(params)

document.addEventListener("DOMContentLoaded", () => {
    createDocument();

    window.print();
});

const createDocument = () => {
    for (let prop in params) {
        const element = document.getElementById(prop);
        
        if (prop === "cpfCnpj") {
            element.innerHTML = formatCPFOrCNPJ(params[prop]);
        } else if (prop === "areaConstruidaTotal" || prop === "areaDoTerreno") {
            const value = parseFloat(params[prop]).toLocaleString("pt-BR", {
                style: "decimal",
                minimumFractionDigits: 2
            });

            element.innerHTML = `${value} m²`;
        } else {
            element.innerHTML = params[prop];
        }
    }
}

const formatCPFOrCNPJ = (numberString) => {
    if (numberString.length === 11) {
        return numberString.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
    } else if (numberString.length === 14) {
        return numberString.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
    } else {
       return numberString;
    }
}