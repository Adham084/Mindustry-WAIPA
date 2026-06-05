let target = null;
let lastTarget = null;
let display = null;

// ============== functions ==============

function updateTarget(enemy) {
	display.clear();
	
	if (enemy == null) {
        return;
    }

	const block = enemy instanceof Building ? enemy.block : null;
	const unit = enemy instanceof Unit ? enemy.type : null;
	const player = unit && enemy.isPlayer() ? enemy.controller : null;
	const icon = block ? block.uiIcon : enemy.icon();
	
	const info = display.table().minWidth(200).get();
	info.image(icon).size(48).padBottom(8);

	/* Block, Unit, Player names */
	info.label(() => "[#" + enemy.team.color + "]" + (block ? block.localizedName :
		player ? player.name : unit.localizedName))
        .padLeft(8).padBottom(8);
        
	display.row();

	if (block) {
		display.table(null, bars => {
		    bars.defaults().growX().height(18).pad(4);
		    enemy.displayBars(bars);
        }).growX();
        
        if (block.armor > 0) {
	        display.row();
	        display.label(() => "Armor: " + Math.floor(block.armor) + "%").pad(4);
	    }
	} else {
	    display.table(null, bars => {
		    bars.defaults().growX().height(20).pad(4);
		    bars.add(new Bar("stat.health", Pal.health, () => enemy.healthf()).blink(Color.white));
		    bars.row();
		    
		    enemy.abilities.forEach(ability => ability.displayBars(enemy, bars));
            bars.row();
            
            if (enemy instanceof Payloadc && enemy.payloadCapacity > 0) {
                bars.add(new Bar("stat.payloadcapacity", Pal.items, () => enemy.payloadUsed() / enemy.payloadCapacity));
            }
        }).growX();
        
        if (unit.armor > 0) {
	        display.row();
	        display.label(() => "Armor: " + Math.floor(unit.armor) + "%").pad(4);
	    }
	}
}

function chooseTarget() {
    const point = Core.input.mouseWorld();
    target = Units.closestTarget(Vars.player.team(), point.x, point.y, 8);
	
	if (target != lastTarget)
		updateTarget(target);
	
	lastTarget = target;
}

// ================ main =================

if (Vars.headless) {
    print("This mod is meant for clients with GUI and won't do anything on headless servers!");
    return;
}

Events.on(ClientLoadEvent, () => {
    Vars.ui.hudGroup.fill(null, full => {
        full.name = "waipa";
        full.top().right();
        
        full.visibility = () => {
            if (!Vars.ui.hudfrag.shown || Vars.ui.minimapfrag.shown()) {
                return false;
            }
            
            if (!Vars.mobile) {
                return true;
            }
            
            const input = Vars.control.input;
            return (input.lastSchematic == null || input.selectPlans.isEmpty()) &&
                (target != null && target.health > 0);
        };
    
        full.table(Tex.pane, table => {
            table.name = "waipa/inner";
            table.touchable = Touchable.disabled;
            display = table;
        });
        
        if (Core.settings.getBool("minimap")) {
            full.moveBy(-Scl.scl(155), 0);
        }    
    });
});

Events.on(WorldLoadEvent, () => {
	target = null;
});

// Find targets
if (Vars.mobile) {
    Events.run(Trigger.update, () => {
        if (Core.input.justTouched())
	        chooseTarget();
	});
} else {
    Events.run(Trigger.update, () => {
	    chooseTarget();
    });
}
