import UrlPattern from 'url-pattern';
import RouteNameMap from './route_names';

// loop through RouteNameMap keys(route_paths)
// assigning static key to matching dynamic-key value
const RouteNameKeySearch = path_name => {
    for (const key in RouteNameMap) {
        // generate new pattern based on key
        const pattern = new UrlPattern(key);
        // check if path_name matches the pattern
        const result = pattern.match(path_name);
        // result is an object containing parameters from path_name
        if (result) {
            // check if result has parameters
            const hasParams = Object.keys(result).length;
            if (hasParams) {
                // add a key-value pair based on the static path_name
                // matched and the previous dynamic route value(route_name)
                RouteNameMap[path_name] = RouteNameMap[key];
            }
        }
    }
};

// Reverses dynamic paths to obtain corresponding static path
export default function RouteResolver(path_name) {
    RouteNameKeySearch(path_name);

    // divide the pathname into independent components
    const snippets = path_name.split('/').filter(i => i);
    // add a slash to each component to form a url
    const snippetsUrls = snippets.map((v,i,a) => `/${a.slice(0, i+1).join('/')}`);
    // generate a regular expression that filter all urls ending with digits
    const regex = new RegExp(/^(\/home)\/([\w\-/]*)\/(\d+)$/);
    // regex filters out e.g /home/proposals/20 or /home/proposals/objectives.../20
    const Urls = snippetsUrls.filter(v => !regex.test(v));

    // Case of page-reload, ensure that all previously generated
    // static urls are reconstructed.
    const routeKeys = Object.keys(RouteNameMap);
    // check if previous static urls are in the RouteNameMap
    // if not, regenerate by recursively calling RouteResolver
    Urls.forEach(v => routeKeys.includes(v) ? v : RouteNameKeySearch(v));
       
    return Urls;
}