import { JWT_TOKEN_COOKIE_NAME } from '$env/static/private';
import { getFollowing } from '$lib/user';
import { getPaginationOptionsFromURL } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async function ({ cookies, params, url }) {
    return {
        following: await getFollowing(
            cookies.get(JWT_TOKEN_COOKIE_NAME)!,
            params.username,
            getPaginationOptionsFromURL(url)
        )
    };
};
