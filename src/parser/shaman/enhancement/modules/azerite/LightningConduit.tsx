import React from 'react';
import SPELLS from 'common/SPELLS/index';

import Analyzer, { SELECTED_PLAYER } from 'parser/core/Analyzer';

import Statistic from 'interface/statistics/Statistic';
import Events, { DamageEvent } from 'parser/core/Events';
import STATISTIC_ORDER from 'interface/others/STATISTIC_ORDER';
import BoringSpellValueText
  from 'interface/statistics/components/BoringSpellValueText';
import ItemDamageDone from 'interface/ItemDamageDone';

class LightningConduit extends Analyzer {
  /**
   * Stormstrike marks the target as a Lightning Conduit for 1 min. Stormstrike
   * deals Nature damage to all enemies you've marked as Conduits.
   *
   * Example Log:
   * https://www.warcraftlogs.com/reports/2cBAMJQYLnm8d7H3#fight=45&type=damage-done&view=events&source=202&ability=275394
   *
   */

  protected damageGained = 0;

  constructor(options: any) {
    super(options);
    this.active
      = this.selectedCombatant.hasTrait(SPELLS.LIGHTNING_CONDUIT_TRAIT.id);

    this.addEventListener(
      Events.damage.by(SELECTED_PLAYER)
        .spell(SPELLS.LIGHTNING_CONDUIT_DAMAGE),
      this.onLightningConduit,
    );
  }

  onLightningConduit(event: DamageEvent) {
    this.damageGained += event.amount;
  }

  // TODO: Show statistics of amount of hits compared to stormstrike uses with
  // Lightning Conduit active
  statistic() {
    return (
      <Statistic
        position={STATISTIC_ORDER.OPTIONAL()}
        size="flexible"
        category={'ITEMS'}
      >
        <BoringSpellValueText spell={SPELLS.LIGHTNING_CONDUIT_TRAIT}>
          <>
            <ItemDamageDone amount={this.damageGained} />
          </>
        </BoringSpellValueText>
      </Statistic>
    );
  }
}

export default LightningConduit;
