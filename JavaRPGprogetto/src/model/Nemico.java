package model;

public class Nemico extends Entita {
	private String razza;
	boolean boss;
	int exp;

	public Nemico(int currentHp, int maxHp, int maxMana, int currentMana, int attacco, String razza, boolean boss,
			int exp) {
		super(currentHp, maxHp, maxMana, currentMana, attacco, razza);
		this.setRazza(razza);
		this.setBoss(boss);
		this.setExp(exp);

	}

	public String getRazza() {
		return razza;
	}

	public void setRazza(String razza) {
		this.razza = razza;
	}

	public boolean isBoss() {
		return boss;
	}

	public void setBoss(boolean boss) {
		this.boss = boss;
	}

	public int getExp() {
		return exp;
	}

	public void setExp(int exp) {
		this.exp = exp;
	}

}
