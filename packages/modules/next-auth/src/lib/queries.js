import * as queries from 'next-auth-sanity/dist/queries';

queries.getVerificationRequestQuery = `*[_type == 'verification-request' && identifier == $identifier && _id == $id][0]`;

export default queries;
