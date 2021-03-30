import defaultParserInterface from './defaultParserInterface';


const ID = 'antlr-parser';


export default {
    ...defaultParserInterface,

    id : ID,
    displayName : ID,
    version : 1.0,
    homepage : "",

    locationProps : new Set(['startIndex','endIndex','startLineNumber','startColNumber','endLineNumber','endColNumber']),
    typeProps : new Set(['ruleName']),
    _ignoredProperties : new Set([]),

    loadParser(callback) {
        require(['axios'], callback);
    },

    async parse(axios, code) {
        const response = await axios.post("https://code-parser-int.quod.ai/parse", this.getRequestBody(code))
        // const response = await axios.post("/parse", this.getRequestBody(code))
        try{
            let firstResponse = response.data["responses"][0];
            if(firstResponse["statusCode"] !== 500)
                return firstResponse["astRoot"];
            else return firstResponse["message"]
        }catch (e) {
            console.error(e);
            return response;
        }
    },

    getRequestBody(code) {
        return {
            "codeFiles": [
                {
                    "code":code,
                    "language": this.language
                }
            ]
        }
    },


    getDefaultOptions() {
        return {};
    },

    getNodeName({ruleName}) {
        return ruleName;
    },

    nodeToRange(node) {
        let {startIndex, endIndex} = node;
        if (startIndex === undefined) return;
        return [node.startIndex, node.endIndex + 1];
    }
};
