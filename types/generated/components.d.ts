import type { Schema, Struct } from '@strapi/strapi';

export interface DishPropsDishOption extends Struct.ComponentSchema {
  collectionName: 'components_dish_props_dish_options';
  info: {
    displayName: 'Dish option';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    label: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    optionlist: Schema.Attribute.Component<'forms.option-list', true>;
    rule: Schema.Attribute.Text;
    validators: Schema.Attribute.Component<'forms.form-validators', false>;
  };
}

export interface FormsFormValidators extends Struct.ComponentSchema {
  collectionName: 'components_forms_form_validators';
  info: {
    displayName: 'form_validators';
    icon: 'file';
  };
  attributes: {
    isFull: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    required: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
  };
}

export interface FormsOption extends Struct.ComponentSchema {
  collectionName: 'components_forms_options';
  info: {
    displayName: 'option';
  };
  attributes: {
    check: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 4;
      }>;
    image: Schema.Attribute.Component<'shared.profile', false>;
  };
}

export interface FormsOptionList extends Struct.ComponentSchema {
  collectionName: 'components_forms_option_lists';
  info: {
    displayName: 'optionList';
  };
  attributes: {
    active: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isMulti: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
    list: Schema.Attribute.Component<'forms.option', true>;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedProfile extends Struct.ComponentSchema {
  collectionName: 'components_shared_profiles';
  info: {
    displayName: 'Profile';
  };
  attributes: {
    identification_photo: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'dish-props.dish-option': DishPropsDishOption;
      'forms.form-validators': FormsFormValidators;
      'forms.option': FormsOption;
      'forms.option-list': FormsOptionList;
      'shared.media': SharedMedia;
      'shared.profile': SharedProfile;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
