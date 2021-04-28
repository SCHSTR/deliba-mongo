function getPrefix(id) {
    var prefix = this.prefix;
    switch (typeof prefix) {
        case "object":
            if (prefix[id])
                return prefix[id];
            else
                return prefix.default;
        case "string":
            return prefix;
    }
}
exports.getPrefix = getPrefix