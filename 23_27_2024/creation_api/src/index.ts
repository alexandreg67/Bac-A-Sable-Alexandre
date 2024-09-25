import express from 'express';
import repoControllers from './repos/repos.controllers';
import langsControllers from './langs/langs.controllers';
import statusControllers from './status/status.controllers';
import langByRepoControllers from './lang_by_repo/lang_by_repo.controllers';

const app = express();

app.use(express.json());

app.use('/repos', repoControllers);
app.use('/langs', langsControllers);
app.use('/status', statusControllers);
app.use('/lang_by_repo', langByRepoControllers);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
