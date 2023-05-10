package com.zensar.core.models;

import java.util.List;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.models.annotations.DefaultInjectionStrategy;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.ChildResource;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

@Model(adaptables = Resource.class, defaultInjectionStrategy = DefaultInjectionStrategy.OPTIONAL)
public class FooterModel {

	@ValueMapValue
	private String fileReference;
	
	@ValueMapValue
	private String alt;
	
	@ValueMapValue
	private String text;
	
	@ValueMapValue
	private String addressLabel;
	
	@ValueMapValue
	private String address;
	
	@ValueMapValue
	private String disclaimer;

	@ChildResource
	private List<FooterNavigation> footerNavList;
	
	@ChildResource
	private List<SocialMedia> socialMedia;

	/**
	 * Returns the list of footerNavList as authored in the component dialog.
	 * 
	 * @return list of footerNavList.
	 */
	public List<FooterNavigation> getFooterNavList() {
		return footerNavList;
	}

	/**
	 * Returns the list of socialMedia as authored in the component dialog.
	 * 
	 * @return list of socialMedia.
	 */
	public List<SocialMedia> getSocialMedia() {
		return socialMedia;
	}
	
	/**
	 * Returns the fileReference authored in the dialog.
	 * 
	 * @return the fileReference
	 */
	public String getFileReference() {
		return fileReference;
	}
	
	/**
	 * Returns the alt authored in the dialog.
	 * 
	 * @return the alt
	 */
	public String getAlt() {
		return alt;
	}
	
	/**
	 * Returns the text authored in the dialog.
	 * 
	 * @return the text
	 */
	public String getText() {
		return text;
	}
	
	/**
	 * Returns the addressLabel authored in the dialog.
	 * 
	 * @return the addressLabel
	 */
	public String getAddressLabel() {
		return addressLabel;
	}
	
	/**
	 * Returns the address authored in the dialog.
	 * 
	 * @return the address
	 */
	public String getAddress() {
		return address;
	}
	
	/**
	 * Returns the disclaimer authored in the dialog.
	 * 
	 * @return the disclaimer
	 */
	public String getDisclaimer() {
		return disclaimer;
	}

}
