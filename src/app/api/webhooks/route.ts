import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { env } from '@/lib/env';
import { createUser, deleteUser } from '@/server-actions/clerk';
import { ClerkUserCreated, ClerkUserDeleted } from '@/types/clerk';

interface ClerkPayload {
    data: Record<string, any>;
    object: string;
    type: 'user.created' | 'user.deleted';
}

export async function POST(req: Request) {
    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400,
        });
    }

    // Get the body
    const payload = (await req.json()) as ClerkPayload;
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(env.CLERK_WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400,
        });
    }

    // Get the ID and type
    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
    console.log('Webhook body:', JSON.stringify(payload, null, 2));

    switch (payload.type) {
        case 'user.created':
            await createUser(payload.data as ClerkUserCreated);
            break;

        case 'user.deleted':
            await deleteUser(payload.data as ClerkUserDeleted);
            break;
        default:
            break;
    }

    return new Response('', { status: 200 });
}
