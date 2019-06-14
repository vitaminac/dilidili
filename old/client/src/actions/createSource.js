import encodeBookUrl from "../transformer/encodeBookUrl";
import ddcat from "../services/ddcatPluginLoader";

export default function createSource(node) {
    return encodeBookUrl(ddcat.getData(node));
}
