import { AppDataSource } from '../src/data-source';
import { ActivityLabel } from '../src/entity/ActivityLabel';

const labels = ['sem categoria', 'tarefa', 'lazer', 'trabalho', 'comida', 'atividade física'];

async function seed() {
  const activityLabels: ActivityLabel[] = [];

  for (const label of labels) {
    const activityLabel = new ActivityLabel();
    activityLabel.name = label;
    activityLabels.push(activityLabel);
  }
  await AppDataSource.getRepository(ActivityLabel).save(activityLabels);
  await AppDataSource.destroy();
}


AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
    seed().then(() => {
      console.log('Seed concluded successfully!');
    }).catch(error => {
      console.error('Error during Data Source Seed', error);
    });    
  })
  .catch((err: unknown) =>
    console.error('Error during Data Source initialization', err)
  );