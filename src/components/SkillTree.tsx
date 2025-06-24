import React from 'react';
import { useGame } from '../context/GameContext';
import styles from './SkillTree.module.css';

export const SkillTree: React.FC = () => {
  const { state, dispatch } = useGame();

  const handleUnlockSkill = (skillId: string) => {
    dispatch({ type: 'UNLOCK_SKILL', skillId });
  };

  const canUnlockSkill = (skill: typeof state.skills[number]) => {
    if (skill.unlocked || state.clicks < skill.cost) return false;
    return skill.dependencies.every(depId =>
      state.skills.find(s => s.id === depId)?.unlocked
    );
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Skill Tree
      </h2>
      <div className={styles.grid}>
        <div className={styles.gridOverlay}>
          {state.skills.map(skill => 
            skill.dependencies.map(depId => {
              const parentSkill = state.skills.find(s => s.id === depId);
              if (!parentSkill) return null;

              const startX = parentSkill.position.x;
              const startY = parentSkill.position.y;
              const endX = skill.position.x;
              const endY = skill.position.y;

              return (
                <div
                  key={`${skill.id}-${depId}`}
                  className={`${styles.connection} ${skill.unlocked && parentSkill.unlocked ? styles.unlocked : styles.locked}`}
                  style={{
                    left: `${startX * 33.33}%`,
                    top: `${startY * 120 + 60}px`,
                    width: `${Math.abs(endX - startX) * 33.33}%`,
                    height: `${Math.abs(endY - startY) * 120}px`,
                    borderLeftWidth: startX !== endX ? '2px' : 0,
                    borderBottomWidth: startY !== endY ? '2px' : 0,
                  }}
                />
              );
            })
          )}
        </div>

        {state.skills.map((skill) => {
          const canUnlock = canUnlockSkill(skill);
          const skillState = skill.unlocked ? 'unlocked' : canUnlock ? 'available' : 'locked';
          
          return (
            <div
              key={skill.id}
              style={{
                gridColumn: skill.position.x + 1,
                gridRow: skill.position.y + 1,
              }}
            >
              <div className={`${styles.skillCard} ${styles[skillState]}`}>
                <h3 className={styles.name}>
                  {skill.name}
                </h3>
                <p className={styles.description}>
                  {skill.description}
                </p>
                <span className={`${styles.effect} ${styles[skill.effect.type === 'clickPower' ? 'clickPower' : 'factoryBoost']}`}>
                  {skill.effect.type === 'clickPower' ? 'Click Power' : 'Factory Boost'}: {skill.effect.value}x
                </span>
                <button
                  onClick={() => handleUnlockSkill(skill.id)}
                  disabled={!canUnlock}
                  className={`${styles.buyButton} ${styles[skillState]}`}
                >
                  {skill.unlocked
                    ? 'Unlocked'
                    : `Unlock for ${skill.cost} clicks`}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 