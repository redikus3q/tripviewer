// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { slateEditor } from "@payloadcms/richtext-slate";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { en } from "@payloadcms/translations/languages/en";
import { ro } from "@payloadcms/translations/languages/ro";

import { Media } from "./collections/Media";
import { Trips } from "./collections/Trips";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Media, Trips],
	editor: slateEditor({}),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: postgresAdapter({
		pool: {
			connectionString: process.env.DATABASE_URI || "",
		},
	}),
	sharp,
	plugins: [
		// payloadCloudPlugin(),
		vercelBlobStorage({
			enabled: true, // Optional, defaults to true
			// Specify which collections should use Vercel Blob
			collections: {
				media: true,
			},
			// Token provided by Vercel once Blob storage is added to your Vercel project
			token: process.env.BLOB_READ_WRITE_TOKEN,
		}),
	],
	i18n: {
		fallbackLanguage: "ro",
		supportedLanguages: { en, ro },
	},
});
