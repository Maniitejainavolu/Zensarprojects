package com.zensar.core.models;

import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class HeroCarouselModel {

	@ValueMapValue
	private String heading;
	
	@ValueMapValue
	private String description;
	
	@ValueMapValue
	private String ingredientLabel;

	@ValueMapValue
	private String ingredientLink;
	
	@ValueMapValue
	private String partnerLabel;

	@ValueMapValue
	private String partnerLink;

	@ChildResource
	private List<HeroCarouselItem> carouselItems;

	/**
	 * Returns the list of carouselItems as authored in the component dialog.
	 * 
	 * @return list of carouselItems.
	 */
	public List<HeroCarouselItem> getCarouselItems() {
		return carouselItems;
	}

	/**
	 * Returns the heading authored in the dialog.
	 * 
	 * @return the heading
	 */
	public String getHeading() {
		return heading;
	}
	
	/**
	 * Returns the description authored in the dialog.
	 * 
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}
	
	/**
	 * @return the ingredientLabel
	 */
	public String getIngredientLabel() {
		return ingredientLabel;
	}
	
	/**
	 * @return the ingredientLink
	 */
	public String getIngredientLink() {
		return ingredientLink;
	}
	
	/**
	 * @return the partnerLabel
	 */
	public String getPartnerLabel() {
		return partnerLabel;
	}
	
	/**
	 * @return the partnerLink
	 */
	public String getPartnerLink() {
		return partnerLink;
	}

}
